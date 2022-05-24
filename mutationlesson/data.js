const data = {
    users: [
        {
            id: '1',
            username: 'John',
            description: 'Lorem Ipsum, Lorem Ipsum dolor sit amet, consectet',
        },
        {
            id: '2',
            username: 'Adam',
            description: 'Lorem Ipsum, Lorem Ipsum dolor sit amet, consectet',
        },
    ],

    posts: [
        {
            id: '1',
            title: 'John first post',
            description: 'Lorem Ipsum, Lorem Ipsum dolor sit amet',
            user_id:'1',
        },
        {
            id: '2',
            title: 'Adam first post',
            description: 'Lorem Ipsum, Lorem Ipsum dolor sit amet',
            user_id:'2',
        },
    ],

    comments: [
        {
            id: '1',
            post_id: '1',
            user_id: '2',
            text: 'Adams first comment for Johns first post'
        },
        {
            id: '2',
            post_id: '1',
            user_id: '1',
            text: 'John first comment for his first post'
        },
    ]
}

module.exports = data