import tornado.ioloop
import tornado.options
import tornado.web
import tornado.websocket
import os.path
from PIL import Image

from tornado.options import define, options


define("port", default=8888, help="run on the given port", type=int)

class Application(tornado.web.Application):
    """
    Create Tornado application with main index page and websocket handler
    for update of icon position.
    """
    def __init__(self):
        handlers = [(r"/", MainHandler)]
        settings = dict(
            cookie_secret="__TODO:_GENERATE_YOUR_OWN_RANDOM_VALUE_HERE__",
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            xsrf_cookies=True,
        )
        super(Application, self).__init__(handlers, **settings)


class MainHandler(tornado.web.RequestHandler):
    """
    Obtain icon size and render index page with actual coordinates and icon size.
    """
    def get(self):
        with Image.open(os.path.dirname(__file__)+'/static/cat.jpg', 'r') as image:
            self.width, self.height = image.size

        self.render(
            "index.html",
            position_x=20,
            position_y=30,
            width=15,
            height=20,
        )


def main():
    tornado.options.parse_command_line()
    app = Application()
    app.listen(options.port)
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()
