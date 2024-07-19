from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
# view takes request and returns response (request handler)

# Map this view (action) to url
def say_hello(request):
    # # Can do anything here 
    # # pull db data, transform, send email, etc.
    return HttpResponse('Hello World')
    # return render(request, 'hello.html', {'name': 'pond'}) # Sample template call for django (not used often)
