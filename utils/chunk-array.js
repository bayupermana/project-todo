export default function (data, perChunk) {
	return data.reduce((all,one,i) => {
		const ch = Math.floor(i/perChunk)
		all[ch] = [].concat((all[ch]||[]),one)
		return all
	}, [])
}