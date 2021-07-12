require("babel-register")({ presets: ["es2015", "react"] });
const router = require("./routers").default;
const Sitemap = require("react-router-sitemap").default;
function generateSitemap() {
  return new Sitemap(router)
    .build("https://kidsschool.vercel.app/")
    .save("./public/sitemap.xml");
}
generateSitemap();
