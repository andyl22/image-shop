Next.JS practice project for an ecommerce website.


-- DONE
    - Pages: Home, About, Blogs, Login
    - Dynamic Routes: Sections and Subsections for the shop
    - Dropdown menus for shop nav (Screen reader and keyboard accesible dropdown)
    - Nav menu for website
    - Basic form styling template
    - Dynamic Routing for Subsection Items (current test data is not json, but rather an object that is really an array of objects. To be fixed as part of setting up the mongodb database schema)
    - Added sheets for home page navigation
    - Image slider for home page navigation
    - Created footer with placeholder pages
    - Use route with modal for blog posts
    - Changed the logic for rendering the Blog Modal
    - Need to implement getStaticPaths and getStaticProps. These are hardcoded at the moment.
    - Registration form
     - Auth for login
        * Automatic authentication if httpOnly token is available. Probably send an auth request to check.
     - Plan out and create mongodb schemas based on test data (current test data is not json, but rather an object that is really an array of objects. This should be fine for testing, but will need to be considered as part of the schema planning for the database)
     - Clean up Dyanmic Routing for Sections and Subsections as part of the above
     - Migrate data sources of pages and components to MongoDB


-- IN PROGRESS
    - Cart system for user or localstorage (localstorage done)
    - Checkout menu and forms (Half Done)
    - Add content management (add shop sections => respective subsection => respective items). Locked under user auth (Backend done. Need UI and auth guard)

-- TODO (DONE)
