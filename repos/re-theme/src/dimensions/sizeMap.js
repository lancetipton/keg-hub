/** @module dimensions */
'use strict'

import { mapObj, isObj, toNum, isNum } from 'jsutils'

/**
 * Default sizes for a screen width
 * <br/>Number for each entry defines the breakpoint
 * <br/>The Breakpoint is when the size will take effect
 */
const sizeMap = {
  entries: [
    [ 'xsmall', 320 ],
    [ 'small', 768 ],
    [ 'medium', 1024 ],
    [ 'large', 1366 ],
    [ 'xlarge', 1920 ]
  ],
  hash: {},
  indexes: {},
  keys: [],
}

/**
 * Builds an index of the entry locations in the sizeMap entries
 * <br/>Builds the key value hash of the entries
 * <br/>Builds the keys array of the entries
 *
 * @returns {void}
*/
const buildSizeMapParts = () => {
  sizeMap.indexes = sizeMap.entries.reduce((indexes, entry, index) => {

    // Add the entry value with the index
    indexes[ entry[0] ] = index

    // Add the index with entry value
    indexes[ index ] = entry[0]
    
    // Convert the sizeMap.entries into an object of key value pairs
    sizeMap.hash[ entry[0] ] = entry[1]

    // Build the keys while building the indexes
    sizeMap.keys.push(entry[0])

    return indexes
  }, {})
}


/**
 * Updates the sizeMap.entries with custom values
 * <br/>Keys must already exist in the default sizeMap.indexes
 * <br/>Allowed keys are => xsmall | small | medium | large | xlarge
 * @param {Object} dims - key value pair of custom sizeMap.entries
 *
 * @returns {Object} - Updated sizeMap object
 */
export const setSizes = dims => {
  if(!isObj(dims))
    return console.error(
      `setDimensions method requires an argument of type 'Object'.\nReceived: `,
      dims
    )

  mapObj(dims, (key, value) => {

    // Get the key index form the sizeMap
    const keyIndex = sizeMap.indexes[key]

    // Convert the value to an integer, just a helper incase value is a string
    const newSize = toNum(dims[key])

    // Ensure key is a valid key in the sizeMap indexes and the new size is a valid number
    // Also ensure the entry exists based on the keyIndex
    //  * This should never happen, but just incase
    if(!keyIndex || !newSize || !sizeMap.entries[keyIndex]) return

    // Use the keyIndex to find the entry
    // Set the value to be an entry with key and new size
    sizeMap.entries[keyIndex] = [ key, newSize ]
  })

  // Rebuild the sizeMap parts after updating the dimensions
  buildSizeMapParts()

  return sizeMap
}

/**
 * Helper to get the a size from the sizeMap based on the passed in width
 * @param {string|number} width - number to find the size from
 *
 * @returns
 */
export const getSize = width => {
  // Ensure width is a number that can be compared
  const checkWidth = isNum(width) && width || toNum(width)

  const name = sizeMap.entries
    .reduce((updateSize, [ key, value ]) => {

      // If the checkWidth if more then or equal, just return the updates size
      if(checkWidth <= value) return updateSize
      
      // Check if the value is less then the checkWidth
      value <= checkWidth
        // If it is check if there is an updateSize already sent
        ? updateSize

          // If an update size exists, then check if it's value is less then value
          // If it is, update the size
          ? value > sizeMap.hash[updateSize] && (updateSize = key)

          // Otherwise just update the size
          : (updateSize = key)

        // If value not less then the check width, just bypass with null
        : null

      return updateSize

    // Default to small size
    }, 'small')
    
  
  return [ name, sizeMap.hash[name] ]
}


/**
 * Get an array of all sizes to be merged together
 * @param {string} key - Name of the size
 *
 * @returns {Array} - Array of size key names
 */
export const getMergeSizes = key => {
  // Add 1 because slice does not include the last item of the range
  return sizeMap.entries
    .slice(0, sizeMap.indexes[key] + 1)
    .map(([ name, size ]) => name)
}

// Build the default sizeMap parts
buildSizeMapParts()

/**
 * Get the sizeMap
 *
 * @returns {void}
 */
export const getSizeMap = () => sizeMap