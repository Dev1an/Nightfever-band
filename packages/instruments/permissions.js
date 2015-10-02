const permissions = new OrbitPermissions.Registrar('instruments')

permissions.definePermission('insert')
permissions.definePermission('update')
permissions.definePermission('remove')