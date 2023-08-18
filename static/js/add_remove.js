document.addEventListener('DOMContentLoaded', function(event) {
    // Add select2 to select tags
    let fieldsContainer = document.getElementById('fields-container');
    let selectTags = fieldsContainer.querySelectorAll('select');
    for(let selectTag of selectTags){
        $(selectTag).select2();
    }

    // Remove functionality.
    fieldsContainer.addEventListener('click', function(event) {
        event.preventDefault();
        if (!event.target.classList.contains('remove')) {
            return false;
        }
    
        let currentElement = event.target;
        let field = currentElement.closest('.field-instance');
        let fieldIndex = field.dataset.index;

        field.remove();

        adjustIndices(fieldIndex);
    });

    // Add functionality
    addButton = document.getElementById('add');
    addButton.addEventListener('click', function(event){
        let templateField = document.getElementById('field-_-instance');
        let newField = templateField.cloneNode(true);

        let lastField = document.getElementById('fields-container').querySelector('.field-instance:last-child');
        let lastFieldIndex = parseInt(lastField.dataset.index);

        updateFieldWithNewIndex(newField, /(-)_(-)/, lastFieldIndex+1);

        fieldsContainer.insertAdjacentElement('beforeend', newField);

        newField.classList.remove('is_hidden');
        newField.classList.add('field-instance');

        let selectTags = newField.querySelectorAll('select');
        for(let selectTag of selectTags){
            $(selectTag).select2();
        } 
    });
    
});

function adjustIndices(removedIndex){
    let fieldInstances = document.querySelectorAll('.field-instance');
    for(let fieldInstance of fieldInstances){
        let index = fieldInstance.dataset.index;
        if (index < removedIndex){
            continue;
        }
        updateFieldWithNewIndex(fieldInstance, /(-)\d+(-)/, index-1);
    }
}

function updateFieldWithNewIndex(field, regex, newIndex){
    field.id = field.id.replace(regex, `$1${newIndex}$2`);
    field.dataset.index = newIndex;

    for(let elem of field.querySelectorAll('*')) {
        for(let attr of ['id', 'name', 'for']){
            if(elem.hasAttribute(attr)){
                elem.setAttribute(attr, elem.getAttribute(attr).replace(/(-)_(-)/, `$1${newIndex}$2`));
            }
        }
    }
}