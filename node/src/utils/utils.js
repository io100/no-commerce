const async = require('async');
const fs = require('fs');

import User from '../models/users';


/*
* Removes the string `base64,` from in front of a base64 string
*/
export function trimBase64String(base64String) {
  const metaDataStringPosEnd = base64String.indexOf('base64') + ('base64'.length+1);
  const trimmedBase64 = base64String.substring(metaDataStringPosEnd);
  return trimmedBase64;
}

String.prototype.replaceAll = function(str1, str2, ignore)
{
  return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

export function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// function to encode file data to base64 encoded string
export function base64Encode(file) {
  // read binary data
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

// function to create file from base64 encoded string
export function base64Decode(base64str, file) {
  // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
  const bitmap = new Buffer(base64str, 'base64');
  // write buffer to file
  fs.writeFileSync(file, bitmap);
  console.log('******** File created from base64 encoded string ********');
}


export function createFormattedDate(date) {
  return date.toISOString().slice(0,10);
}

export function truncateStringToWord(str, length, addEllipsis)
{
    if(str.length <= length)
    {
        // provided string already short enough
        return(str);
    }

    // cut string down but keep 1 extra character so we can check if a non-word character exists beyond the boundary
    str = str.substr(0, length+1);

    // cut any non-whitespace characters off the end of the string
    if (/[^\s]+$/.test(str))
    {
        str = str.replace(/[^\s]+$/, "");
    }

    // cut any remaining non-word characters
    str = str.replace(/[^\w]+$/, "");

    const ellipsis = addEllipsis && str.length > 0 ? '&hellip;' : '';

    return(str + ellipsis);
}

export function isValidUrl(url) {
const regex = /^((https?|ftp):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

return regex.test(url);
}

export function objectIdFromDate(date) {
	return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
}

export function dateFromObjectId(objectId) {
	return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
}