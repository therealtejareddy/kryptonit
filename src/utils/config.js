export const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		'X-API-Key': '5T3vKjcNCw7HotC0EAtFDWqA03vmTtGAcyQv61niygzOxydGJdjlPL2jQYCv8HXu'
	}
};

export function addressParser(address) {
	return `${address.substring(0, 5)}.....${address.substr(-4)}`;
}
