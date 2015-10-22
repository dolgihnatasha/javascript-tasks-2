'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите
var spaceReplace = new RegExp(' ', 'g');
var mailTest = new RegExp('^[^@]+@[^@]+\.[^@]+$','ig');


module.exports.add = function add(name, phone, email)
{
    if(checkName(name) && checkPhone(phone) && checkMail(email)){
        phoneBook.push({'name':name, phone:formatPhone(phone), email:email});
    }
};

function formatPhone(phone){
    phone = phone.replace(spaceReplace, '');
    phone = phone.replace(/\(/, '');
    phone = phone.replace(/\)/, '');
    phone = phone.replace(new RegExp('-', 'g'), '');
    return phone;
}

function checkName(name){
    return name && typeof name === 'string';
}

function checkPhone(phone){
    phone = phone.replace(spaceReplace,'');
    if(phone === ''){
        return false;
    }
    if ((/\(/.test(phone) && !/\)/.test(phone)) || (!/\(/.test(phone) && /\)/.test(phone))){
        return false;
    }
    var regExpr = new RegExp('^\\+?(\\d{1,3})?\\(?\\d{3}\\)?(\\d{3}-?\\d-?\\d{3})$', 'g');
    return regExpr.test(phone);
}

function checkMail(email){
    return email && mailTest.test(email);
}


function search(query){
    if (query === ''){
        return phoneBook;
    }
    var result = [];
    var regExpr = new RegExp(query);
    for(var i=0; i<phoneBook.length; i++) {
        var entry = phoneBook[i];
        if (regExpr.test(entry.name) || regExpr.test(entry.email) || regExpr.test(entry.phone)){
            result.push(entry);
        }
    }
    return result;
}

module.exports.find = function find(query) {
    var i;
    var found = search(query);
    for (i = 0; i < found.length; i++) {
        console.log(found[i]['name'] + ', ' + found[i].phone + ', ' +  found[i].email);
    }
};

module.exports.remove = function remove(query) {
    var i;
    var j=0;
    var found = search(query);
    for (i = 0; i < found.length; i++) {
        while (j < phoneBook.length) {
            var entry = phoneBook[i];
            if (entry === found[i]) {
                phoneBook.splice(i, 1);
            } else {
                j++;
            }
        }
    }
    console.log('Удалено контактов:',found.length);
};


