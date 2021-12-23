import time
from http.server import BaseHTTPRequestHandler
import os
from PIL import Image
# import RPi.GPIO as GPIO
import time
import threading
import json


class USER:
    def __init__(self):
        self.ip = 0


class PUMP:
    def __init__(self):
        self.gpio_state = False
        # GPIO.setmode(GPIO.BCM)
        # GPIO.setup(23, GPIO.OUT)
        self.time_step = 3
        self.time_bt = 3

    def run(self,value):
        for i in range(value):
            start_time = time.time()
            self.control_gpio(True)
            while time.time() - start_time < self.time_step:
                pass
            self.control_gpio(False)
            start_time = time.time()
            while time.time() - start_time < self.time_bt:
                pass

    def control_gpio(self, boolean):
        if not boolean:
            # GPIO.output(23, GPIO.LOW)
            print("turn off pump")
        else:
            # GPIO.output(23, GPIO.HIGH)
            print("turn on pump")

        self.gpio_state = boolean


pump = PUMP()
user = USER()


class Server(BaseHTTPRequestHandler):
    def empty_json(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        json_str = json.dumps({"ok?":"ok"})
        self.wfile.write(json_str.encode(encoding='utf_8'))
    def _redirect(self, path):
        self.send_response(303)
        self.send_header('Content-type', 'text/html')
        self.send_header('Location', path)
        self.end_headers()

    def send_image(self, path):
        f = open(path, 'rb')
        self.send_response(200)
        self.send_header('Content-type', 'image/png')
        self.end_headers()
        self.wfile.write(f.read())
        f.close()

    def empty_respond(self):
        f = "You are not the main user anymore"
        self.send_error(404, f)

    def drink(self, value):
        global pump
        if not pump.gpio_state:
            pump.run(value)
        self.empty_json()

    def do_GET(self):
        global user

        if self.path == '/':
            user.ip = self.client_address[0]
            self.path = '/index.html'
        try:
            if user.ip != self.client_address[0]:
                print("not main user :", self.client_address[0], " main is :", user.ip)
                self.empty_respond()
                return
            split_path = os.path.splitext(self.path)
            request_extension = split_path[1]
            if request_extension == ".png" or request_extension == ".jpg":
                self.send_image(self.path[1:])

            elif request_extension == ".html" or request_extension == ".css" or request_extension == ".js":
                f = open(self.path[1:]).read()
                self.send_response(200)
                self.end_headers()
                self.wfile.write(bytes(f, 'utf-8'))
            else:
                f = "File not found"
                self.send_error(404, f)
        except:
            f = "File not found"
            self.send_error(404, f)

    def do_POST(self):
        """ do_POST() can be tested using curl command
            'curl -d "submit=On" http://server-ip-address:port'
        """
        global user,pump
        if user.ip != self.client_address[0]:
            print("not main user :", self.client_address[0], " main is :", user.ip)
            self.empty_respond()
            return
        content_length = int(self.headers['Content-Length'])  # Get the size of data
        post_data = self.rfile.read(content_length).decode("utf-8")  # Get the data
        post_data = json.loads(post_data)
        print(post_data)
        if 'strength' in post_data.keys():
            try:
                value = float(post_data["strength"])
                print("new step time : ", value)
                pump.time_step = value
                self.empty_respond()
            except ValueError:
                print("Not a float")
                self.empty_respond()
        if 'valve' in post_data.keys():
            pump.control_gpio(not pump.gpio_state)
            self.empty_json()
        if 'drink' in post_data.keys():
            self.drink(post_data["drink"])

