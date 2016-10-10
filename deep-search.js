/**
 * Recursive search of the full directory tree.
 *
 * @param {string} dirPath
 * @param {number} startPoint
 * @param searchRequest
 * @returns {Array|*}
 */
function deepSearch ( dirPath, startPoint, searchRequest ) {
    var listDir = getListDir(dirPath), // pseudo function for getting dir's content
        currentElemsAmount = listDir.length, // amount of file objects
        i = startPoint;

    deepSearch.scale = deepSearch.scale || [];
    deepSearch.result = deepSearch.result || [];
    deepSearch.request = deepSearch.request || searchRequest || '';

    for ( ; i < currentElemsAmount; i += 1 ) {
        if ( isFile(listDir[i]) ) { // pseudo function to detect if file object is essentially file
            // compare some file attributes with search request
            if ( listDir[i].name.match(RegExp(searchRequest)) ) { // pseudo code
                deepSearch.result.push(listDir[i]);
            }
        } else {
            deepSearch.scale.push(i);
            deepSearch(newDirPath, 0); // pseudo code
        }
    }

    if ( deepSearch.scale.length ) {
        deepSearch(goBackInPathOnOneLevel(dirPath, deepSearch.scale.pop() + 1)); // pseudo function to go up in tree
    } else {
        return deepSearch.result;
    }
}
