// Write your tests here!
// Here is an example.
Tinytest.add('addItem', function (test) {
  const nav = new NavigationSystem()
  
  test.throws(function() {
  	nav.addItem({hello: 'test'})
  }, 'You must specify a routeName');

  const mainRoute = {routeName: 'mainPage'}
  test.equal(nav.items.find(mainRoute).count(), 0)
  nav.addItem(mainRoute)
  test.equal(nav.items.find(mainRoute).count(), 1)

  test.throws(function() {
  	nav.addItem({routeName: 'subRoute', unwindRoute: 'lala'})
  }, 'invalid unwindRoute')

  //TODO

});