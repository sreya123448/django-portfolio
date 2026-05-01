from django.shortcuts import render, redirect
from .forms import ContactForm
from .models import *

def Home(request):
    # ✅ get success from URL
    success = request.GET.get('success') == '1'

    form = ContactForm()
    return render(request, 'PortApp/home.html', {
        'form': form,
        'success': success
    })


def contact_view(request):
    if request.method == 'POST':
        print("FORM SUBMITTED ✅") 

        form = ContactForm(request.POST)

        if form.is_valid():
            form.save()

            # ✅ REDIRECT (important fix)
            return redirect('/?success=1')

    return redirect('/')  # fallback