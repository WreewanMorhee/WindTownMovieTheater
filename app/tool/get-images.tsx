export const get_image = (url: string): Promise<string> => {
	return new Promise(function (resolve, reject) {
		var img = new Image()
		img.onload = function () {
			resolve(url)
		}
		img.onerror = async function () {
			if (img.src === url) {
				resolve('')
			} else {
				reject('')
			}
		}

		img.src = url
	})
}
