const permissions = [
    {
        roles:['friend', 'guest'],
        allows:[
            {resources:'/users/:id/article-shortform', permissions: ['post']},
            {resources:'/users/:id/article', permissions: ['post']},
        ],
    },
    {
        roles:['guest'],
        allows:[
            {resources:'/users/:id/article-shortform', permissions: ['post']},
        ]
    }
]

var acl = require('acl');
acl = new acl(new acl.memoryBackend());
acl.allow(permissions);
export default acl;
