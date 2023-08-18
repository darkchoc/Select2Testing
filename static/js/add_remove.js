document.addEventListener('DOMContentLoaded', function(event) {
    // Add select2 to select tags
    let formsContainer = document.getElementById('forms-container');
    let selectTags = formsContainer.querySelectorAll('select');
    for(let selectTag of selectTags){
        $(selectTag).select2();
    }

    // Remove functionality.
    formsContainer.addEventListener('click', function(event) {
        event.preventDefault();
        if (!event.target.classList.contains('remove')) {
            return false;
        }
    
        let currentElement = event.target;
        let subform = currentElement.closest('.form-instance');
        let subformIndex = subform.dataset.index;

        subform.remove();

        adjustIndices(subformIndex);
    });

    // Add functionality
    addButton = document.getElementById('add');
    addButton.addEventListener('click', function(event){
        let templateForm = document.getElementById('form-_-instance');
        let newForm = templateForm.cloneNode(true);

        let lastForm = document.getElementById('forms-container').querySelector('.form-instance:last-child');
        let lastFormIndex = parseInt(lastForm.dataset.index);

        updateFormWithNewIndex(newForm, /(-)_(-)/, lastFormIndex+1);

        formsContainer.insertAdjacentElement('beforeend', newForm);

        newForm.classList.remove('is_hidden');
        newForm.classList.add('form-instance');

        let selectTags = newForm.querySelectorAll('select');
        for(let selectTag of selectTags){
            $(selectTag).select2();
        } 
    });
    
});

function adjustIndices(removedIndex){
    let formInstances = document.querySelectorAll('.form-instance');
    for(let formInstance of formInstances){
        let index = formInstance.dataset.index;
        if (index < removedIndex){
            continue;
        }
        updateFormWithNewIndex(formInstance, /(-)\d+(-)/, index-1);
    }
}

function updateFormWithNewIndex(form, regex, index){
    form.id = form.id.replace(regex, `$1${index}$2`);
    form.dataset.index = index;

    for(let elem of form.querySelectorAll('*')) {
        for(let attr of ['id', 'name', 'for']){
            if(elem.hasAttribute(attr)){
                elem.setAttribute(attr, elem.getAttribute(attr).replace(/(-)_(-)/, `$1${index}$2`));
            }
        }
    }
}