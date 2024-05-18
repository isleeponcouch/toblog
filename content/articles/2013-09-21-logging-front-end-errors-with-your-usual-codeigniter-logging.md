---
title: Logging Frontend Errors With Your Usual CodeIgniter Logging
bg: bg-gray-600
decoration: decoration-gray-600
archived: true
createdAt: 2013-09-21
updatedAt: 2013-09-21
---
If you use [CodeIgniter](http://ellislab.com/codeigniter) for your PHP apps, you probably use its nice logging system too, i.e. `log_message('', '')`. After having some strange front end problems with a site I built recently, I wanted to get logs of errors happening on the front-end, and why not log them right in with the log files I monitor for backend issues anyway?

Put this somewhere in your front-end:

```js
window.onerror = function(errorMsg, url, lineNumber)
{
    var log = new Image();
    var baseURL = 'yourURLHere' + '/felog';
    log.src = baseURL + '?msg=' + errorMsg + '&amp;url=' + url + '&amp;ln=' + lineNumber;
};
```

I adapted the above snippet from this article: [http://devblog.xing.com/frontend/how-to-log-javascript-errors/](http://devblog.xing.com/frontend/how-to-log-javascript-errors/)

Then put this in your back end (make sure baseURL in the js above matches up to this)

```php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Felog extends CI_Controller {
    public function log()
    {
        header("Content-Type: image/jpg");
        $error_message = $this->input->get('msg');
        $error_url = $this->input->get('url');
        $error_line = $this->input->get('ln');
        log_message('error', 'Front end error:');
        log_message('error', ' - ' . $error_message);
        log_message('error', ' - At: ' . $error_url);
        log_message('error', ' - Line: ' . $error_line);
        log_message('error', ' - UA String: ' . $_SERVER['HTTP_USER_AGENT']);
    }
}
/* End of file felog.php */
/* Location: ./application/controllers/felog.php */
```

Boom. Front-end errors in your CodeIgniter logs.