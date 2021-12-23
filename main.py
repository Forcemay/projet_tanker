import time
from http.server import HTTPServer
from server import Server

HOST_NAME = 'localhost'
PORT = 8000

if __name__ == "__main__":
    httpd = HTTPServer((HOST_NAME,PORT),Server)
    print(time.asctime(), "Start Server - %s:%s"%(HOST_NAME,PORT))
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    print(time.asctime(),'Stop Server - %s:%s' %(HOST_NAME,PORT))