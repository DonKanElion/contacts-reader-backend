const { Contact } = require("../models/contact");

const { HttpError } = require("../helpers/index");

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const addContact = async (req, res, next) => {
  const { email } = req.body;

  const checkContactOnEmail = await Contact.find({ email });

  if (checkContactOnEmail.length === 1) {
    return res.status(200).json({ message: "This email have in database." });
  }

  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  return { message: "Contact deleted" };
};

// const updateContact = async (contactId, body) => {
// const { name, email, phone } = body;
// const contacts = await listContacts();
// const index = contacts.findIndex((item) => item.id === contactId);
// if (index === -1) {
//   return { code: 404, message: "Not found" };
// }
// contacts[index] = { id: contactId, name, email, phone };
// await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
// return contacts[index];
// };

// const updateStatusContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
//   if (!result) {
//       throw HttpError(404, "Not found");
//   }
//   res.json(result);
// }

const updateStatusContact = async (contactId, body) => {
  // const { name, email, phone, favorite } = body;

  console.log(body, contactId)
  // console.log("Req.body: ", name, email, phone, favorite, contactId);
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  // updateContact,
  updateStatusContact,
};
