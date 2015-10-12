'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите
var spaceReplace = new RegExp(' ', 'g');
/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {

    if(checkPhone(phone) && checkMail(email)){
        phoneBook.push({'n':name, 'p':phone, 'm':email})
    }
};

function checkPhone(phone){
    //my magical function
    phone = phone.replace(spaceReplace,'');
    var r = new RegExp('\\+?(\\d{1,3})?\\(?\\d{3}\\)?(\\d{3}-?\\d-?\\d{3})', 'g');
    if ((/\(/.test(phone) && !/\)/.test(phone)) || (!/\(/.test(phone) && /\)/.test(phone))){
        //console.log(false, phone);
        return false;
    }
    var m = r.exec(phone);
    return m ? (m[0]==m['input']): false;
}

function checkMail(mail){
    var r = new RegExp(
        "([A-z0-9_а-я-]+[.]?[A-z0-9_а-я-]+)+[@]" +
        "([A-z0-9_а-я-]*\\.[A-z0-9_а-я-]+)+", 'gi');
    var match = r.exec(mail);
    return match ? (match[0] == match['input']): false;
}

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    var r = new RegExp(query),i;
    if (query){
        for(i=0; i<phoneBook.length; i++){
            var entry = phoneBook[i];
            if (r.test(entry['n'])) {
                console.log(entry);
            }else{
                if (r.test(entry['m'])) {
                    console.log(entry);
                }else{
                    var p = entry['p'];
                    p = p.replace(spaceReplace, '');
                    p = p.replace(/\(/, '');
                    p = p.replace(/\)/, '');
                    p = p.replace(new RegExp('-', 'g'), '');
                    if (r.test(p)){
                        console.log(entry)
                    }
                }
            }
        }
    } else {
        for(i=0; i<phoneBook.length; i++){
            console.log(phoneBook[i]);
        }
    }
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {

    var removed = 0;
    var r = new RegExp(query), i = 0;
    if (query){
        while( i<phoneBook.length){
            var entry = phoneBook[i];
            var p = entry['p'];
            p = p.replace(spaceReplace, '');
            p = p.replace(/\(/, '');
            p = p.replace(/\)/, '');
            p = p.replace(new RegExp('-', 'g'), '');
            if (r.test(entry['n']) || r.test(entry['m'])|| r.test(p)){
                phoneBook.splice(i,1);
                removed++;
            }else{
                i++;
            }
        }
    }
    console.log('Удалено контактов:',removed);
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');

    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable(filename) {



};
