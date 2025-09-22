const adminRoute = require('./adminRoute');
const aboutRoute = require('./aboutRoute');
const achievementRoute = require('./achievementRoute');
const contactRoute = require('./contactRoute');
const contactLocation = require('./contactLocationRoute');
const contactSocial = require('./contactSocialRoute');
const homeRoute = require('./homeRoute');
const navbarRoute = require('./NavbarRoute');
const projectRoute = require('./projectRoute');
const qualificationRoute = require('./qualificationRoute');
const serviceRoute = require('./serviceRoute');
const achieveCount = require('./achievementCountRoute');
const skillRoute = require('./skillRoute');
const footerNewsRoute = require('./footerNewsRoute');

const routes = [
    {
        path: '/api/admin',
        handler: adminRoute
    },
    {
        path: '/api/about',
        handler: aboutRoute
    },
    {
        path: '/api/achievement',
        handler: achievementRoute
    },
    {
        path: '/api/contact',
        handler: contactRoute
    },
    {
        path: '/api/contact/location',
        handler: contactLocation
    },
    {
        path: '/api/contact/social',
        handler: contactSocial
    },
    {
        path: '/api/home',
        handler: homeRoute
    },
    {
        path: '/api/navbar',
        handler: navbarRoute
    },
    {
        path: '/api/project',
        handler: projectRoute
    },
    {
        path: '/api/qualification',
        handler: qualificationRoute
    },
    {
        path: '/api/service',
        handler: serviceRoute
    },
    {
        path: '/api/achieve',
        handler: achieveCount
    },
    {
        path: '/api/skill',
        handler: skillRoute
    },
    {
        path: '/api/footer',
        handler: footerNewsRoute
    }
];

module.exports = app =>{
    routes.forEach( route =>{
        if( route.path == '/'){
            app.get( route.path, route.handler);
        } else{
            app.use( route.path, route.handler);
        };
    });
};