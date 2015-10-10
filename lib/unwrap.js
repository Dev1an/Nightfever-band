unwrap = function (object, ...properties) {
	for (var i=0; object!== undefined && i<properties.length; ++i)
		object = object[properties[i]]
	return object;
}