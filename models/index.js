const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});

function generateSlug (title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

const Page = db.define("page", {
  title: {type: Sequelize.STRING, allowNull: false},
  slug: {type: Sequelize.STRING, allowNull: false},
  content: {type: Sequelize.TEXT, allowNull: false},
  status: Sequelize.ENUM("open", "closed"),
});

const User = db.define("user", {
  name: {type: Sequelize.STRING, allowNull: false},
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
});

Page.beforeValidate((page) => {
  page.slug = generateSlug(title);
  console.log('Before Validating')
})

module.exports = {
  db,
  Page,
  User,
};
