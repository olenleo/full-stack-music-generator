// Necessary variables for midi manipulation
// TODO: place these into notereader..?



let sumOfOdds = 0;


let num = 0.05;
function getDouble() {
	return Math.random();
}/**
 * Generate new words according to frequency of letters
 * @param {*} root Root node in Trie
 * @param {*} freqArray Array 1-127 containing frequency of note occurences
 * @param {*} depth Current depth in trie
 */

function generateNoteChain(root, freqArray, depth) {
	console.log('GenerateNoteChain recieves', root, freqArray, depth);
	console.log('Children:', root.children);
	let table = createTableOfOdds(root);

	if (root.end) {
		return freqArray;
	}

	num = getDouble();
	for (let i = 0; i < 127; i++) {
		if (num <= table[i] && table[i] > 0) {
			//let noteDuration = Math.round(root.children[i].note.duration / 480 * 100.0) / 100.0;
			//let timeToNextNote = root.children[i].note.rest;
            console.log('root', root);
			const contentAsJSON = JSON.parse(
				`{
                    "pitch" : ${i}, 
                    "amp": ${root.children[i].key.amp}, 
                    "duration": 1,
                    "rest": 1,
                    "freq": ${root.children[i].key.freq},
                    "children": []
                }`);
			freqArray[depth] = contentAsJSON;
			return generateNoteChain(root.children[i], freqArray, depth + 1);
		}
		if (num > table[i] && table[i] > 0) {
			const contentAsJSON = JSON.parse(
				`{
                    "pitch" : ${i}, 
                    "amp": ${root.children[i].key.amp}, 
                    "duration": 1,
                    "rest": 1,
                    "freq": ${root.children[i].key.freq},
                    "children": []
                }`);
			freqArray[depth] = contentAsJSON;
			return generateNoteChain(root.children[i], freqArray, depth + 1);
		}
	}
}


function createTableOfOdds(root) {
	// Generate empty array
	let odds = Array.apply(null, Array(127)).map(Number.prototype.valueOf,0);
	for (let i = 0; i < 127; i++){
		if (root.children[i] !== undefined) {
			odds[i] = root.children[i].key.freq;
			sumOfOdds += root.children[i].key.freq;
		}
	}
	return calculateOdds(odds, sumOfOdds);
}

function calculateOdds(table, sum) {
	let previous = table[0] / sum;
	table[0] = previous;
	for (let i = 1; i < table.length; i++) {
		if (table[i] > 0) {
			let current = table[i] / sum;
			table[i] = (previous + current);
			previous = table[i];
		}
	}
	return table;
}


export default generateNoteChain;


