import faker from 'faker';
import moment from 'moment';

let feed = [];

for (let i = 0; i < 9; i++)
  feed.push({
    id: faker.random.uuid(),
    createdAt: faker.date.between('2018-01-01', '2018-05-15'),
    name: faker.name.findName(),
    avatar: faker.image.avatar(),
    image: `https://picsum.photos/600/400/?image=${Math.round(Math.random() * 1000)}`,
    views: Math.ceil(Math.random() * 10000 + 1000),
    likes: Math.ceil(Math.random() * 1000 + 100),
    comments: Math.ceil(Math.random() * 250 + 10),
    content: faker.lorem.sentence()
  });

feed.sort((a, b) => a.createdAt > b.createdAt);

for (let m = 0; m < 12; m++) {
  let idx = feed.findIndex(item => item.createdAt && moment(item.createdAt).month() == m);

  if (idx >= 0) {
    let counts = feed.filter(item => item.createdAt && moment(item.createdAt).month() == m).reduce(
      (acc, item) => ({
        views: acc.views + item.views,
        likes: acc.likes + item.likes,
        comments: acc.comments + item.comments
      }),
      { views: 0, likes: 0, comments: 0 }
    );

    feed.splice(idx, 0, {
      id: faker.random.uuid(),
      month: moment(`${m + 1}`, 'M').format('MMMM'),
      ...counts
    });
  }
}

export default feed;
