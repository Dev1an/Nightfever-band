Permissions = new Mongo.Collection('permissions')

/**
 * Give users of a certain role permission to do something 
 * @param {String} roleName
 * @param {String} permissionId A name for the permission.
 */
Roles.addPermission = function(roleName, ...permissionId) {
  const roleCursor = Meteor.roles.find({name: roleName})
  
  if (roleCursor.count() < 1) throw new Error(`Role '${roleName}' does not exist`)
  else {
    const role = roleCursor.fetch()[0]
    for (var _id of permissionId){
      if (Permissions.find({_id, 'roles': role.name}).count() < 1) {
        if (Permissions.find(_id).count() > 0) {
          Permissions.update(_id, {$push: {roles: role.name}})
        } else {
          Permissions.insert({
            _id,
            roles: [role.name]
          })
        }
      }
    }
  }
}

/**
 * Find out if a user has a specific permission
 * @param  {String} permissionId
 * @param  {String} [userId] Will default to the current user when ran on the client.
 * @return {Boolean}
 */
Roles.permissionTo = function (permissionId, userId) {
  if (Meteor.isServer && userId == undefined) throw new Error('when running code on the server, you must provide a userId')
  const user = (userId === undefined) ? Meteor.user() : Meteor.users.findOne(userId)
  const permissionCursor = Permissions.find(permissionId)
  
  if (permissionCursor.count() < 1) throw new Error(`Permission ${permissionId} does not exist`)
  else {
    return Permissions.find({
      _id: permissionId,
      roles: {
        $in: user.roles || []
      }
    }).count() > 0
  }
}

if (Meteor.isClient) {
  Meteor.subscribe('permissions')
}