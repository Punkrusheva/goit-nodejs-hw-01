const shortid = require('shortid')
const fs = require('fs')
const path = require('path')

const contactsPath = path.join(__dirname, './db/contacts.json')

function listContacts () {
  fs.readFile(contactsPath, { encoding: 'utf8' }, (err, data) => {
    if (err) { console.log(err.message) } else {
      const contacts = JSON.parse(data)
      console.table(contacts)
    }
  })
}

function getContactById (contactId) {
  fs.readFile(contactsPath, { encoding: 'utf8' }, (err, data) => {
    if (err) { console.log(err.message) } else {
      const contacts = JSON.parse(data)
      const contact = contacts.find(contact => contact.id === contactId)
      console.log(contact)
    }
  })
}

function removeContact (contactId) {
  fs.readFile(contactsPath, { encoding: 'utf8' }, (err, data) => {
    if (err) { console.log(err.message) } else {
      let contacts = JSON.parse(data)
      contacts = JSON.stringify(contacts.filter(({ id }) => id !== contactId), null, '\t')
      console.log(`Контакт с id=${contactId} удален`)
      fs.writeFile(contactsPath, contacts, (err) => { if (err) console.error(err) }
      )
    }
  })
}

function addContact (name, email, phone) {
  fs.readFile(contactsPath, { encoding: 'utf8' }, (err, data) => {
    if (err) { console.log(err.message) } else {
      const contacts = JSON.parse(data)
      const user = { id: shortid.generate(), name: name, email: email, phone: phone }
      const string = JSON.stringify([user, ...contacts], null, '\t')
      console.log(`Контакт ${name} добавлен`)
      fs.writeFile(contactsPath, string
        , (err) => { if (err) console.error(err) }
      )
    }
  })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}
