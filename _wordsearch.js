// version:2024-03-13at13:05 create _wordsearch.js to work in current directory having /!PNGCustom/_words.array2.js
// version:2024-02-10at11:18 reset focus to regexInput after search
// version:2024-01-28at17:56 document.title = `Regex Search of ${imagePath1}`;
// version:2024-01-10at10:05 Add max words count
// version:2024-01-09at21:06 Display Dict2 with + first, then mark words in dict with * if they are in dict2
// version:2024-01-09at15:52 Include Dict2
// 20231220at2100 negative vertical align values cause the image to move up 
// 20231220at2050 add version number
// 20231216 convert to use Array /djsWords/_words.array.js

// Set the version number
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('version').textContent = 'version:2024-02-10at11:18';
});
// create a script tag to load the dict1 array
window.onload = function() {
 //   var imagePath1 = //path to word.png images set in wordssearch.htm file
    let script1 = document.createElement('script');
    script1.src = imagePath1 + '_words.array.js';
    document.head.appendChild(script1);
}

// create a script tag to load the dict2 array
const imagePath2 = imagePath1 + '!PNGCustom/'; //path to enhanced word.png images
let script2 = document.createElement('script');
script2.src = imagePath2 + '_words.array2.js'; //path to Customize dict2 array
document.head.appendChild(script2);
// Add an event listener for the keydown event
document.addEventListener("keydown", function(event) {
    // Check if the key pressed is enter
    if (event.key === "Enter") {
      // Call the displayHello function
      performSearch();
    }
  });

  //add vertical align to the image based on the content of a corresponding text file 
  function getVerticalAlign(pngFile) {
    var txtFile = pngFile.replace('.png', '.txt');

    return fetch(txtFile)
        .then(response => {
            if (!response.ok) {
                return '0px';
            }
            return response.text();
        })
        .then(px => (-1 * parseFloat(px.trim())) + 'px')  // Prepend a '-' to the number
        .catch(() => '0px');
}



// Function to perform the search
function performSearch() {
    const maxWords = document.getElementById("maxWords").value;
    const regexInput = document.getElementById("regexInput");
    const resultList = document.getElementById("resultList");
    const pattern = regexInput.value;
    let countMatches = 0;
    let countDisplay = 0;
    // Clear previous results
    resultList.innerHTML = "";
    try {
        // Escape the user input and create the regular expression
        dict2.forEach(word => {
            const regexPattern = new RegExp(pattern, 'i');
            if (regexPattern.test(word)) {
                countMatches++
                const listItem = document.createElement("li");
                listItem.textContent = word+"+";
                listItem.addEventListener("click", () => copyToClipboard(word));

                // Create an img element for the word if the PNG file exists
                const img = document.createElement("img");
                img.src = `/${imagePath2}${word}.png`;
                img.onerror = function() {
                    this.style.display = "none";  // Hide the image if it fails to load
                };

                // Add vertical align to the image based on the content of a corresponding text file
                getVerticalAlign(img.src).then(verticalAlign => {
                    img.style.verticalAlign = verticalAlign;
                });

                listItem.appendChild(img);

                // Create an img element for the text image
                const imgTag = document.createElement("img");
                imgTag.src = `/${imagePath2}${word}.tag.png`;
                imgTag.onerror = function() {
                    this.style.display = "none";  // Hide the image if it fails to load
                };

                listItem.appendChild(imgTag);

                resultList.appendChild(listItem);
                countDisplay++
            }
        });
        // After looping through dict
        if (resultList.innerHTML === "") {
   
        } else {
            if (resultList.innerHTML === "") {
                // ...
            } else {
                const endOfResults = document.createElement("div");
                endOfResults.textContent = `<end of ${countDisplay} Custom Outline matches>`;
                endOfResults.style.color = "black";
                resultList.appendChild(endOfResults);
            }
        }
        // Loop through the dict array
        for (let word of dict) {
            const regexPattern = new RegExp(pattern, 'i');
            //Handle enhanced word images
            if (regexPattern.test(word)) {
                countMatches++;
                if (countDisplay > maxWords) continue;
                const listItem = document.createElement("li");
                listItem.textContent = word;
                if (dict2.includes(word)) {
                    listItem.textContent = word+"*";
                }
                listItem.addEventListener("click", () => copyToClipboard(word));

                // Create an img element for the word if the PNG file exists
                const img = document.createElement("img");
                img.src = `${imagePath1}${word}.png`;
                img.onerror = function() {
                    this.style.display = "none";  // Hide the image if it fails to load
                };

                // Add vertical align to the image based on the content of a corresponding text file
                getVerticalAlign(img.src).then(verticalAlign => {
                    img.style.verticalAlign = verticalAlign;
                });

                listItem.appendChild(img);

                // Create an img element for the text image
                const imgTag = document.createElement("img");
                imgTag.src = `${imagePath1}${word}.tag.png`;
                imgTag.onerror = function() {
                    this.style.display = "none";  // Hide the image if it fails to load
                };

                listItem.appendChild(imgTag);

                resultList.appendChild(listItem);
                countDisplay++
                
            }
        };
        // After looping through dict
        if (countMatches > maxWords) {
            const maxResults = document.createElement("div");
            maxResults.textContent = `Max display limited to ${countDisplay} of ${countMatches} matches`;
            maxResults.style.color = "black";
            resultList.appendChild(maxResults);
        } else if (resultList.innerHTML === "") {
            const endOfResults = document.createElement("div");
            endOfResults.textContent = "<No matches found>";
            endOfResults.style.color = "black";
            resultList.appendChild(endOfResults);
        } else {
            const endOfResults = document.createElement("div");
            endOfResults.textContent = `<end of ${countDisplay} matches>`;
            endOfResults.style.color = "black";
            resultList.appendChild(endOfResults);
        }
        document.getElementById('regexInput').focus();
        document.getElementById('regexInput').select();
    } catch (error) {
        // Handle the error by displaying an alert
        alert(`Regular Expression ${pattern} Error: ${error.message}`);
    }

}

// Function to copy text to clipboard
function copyToClipboard(text) {
    const clipboardInput = document.getElementById("clipboardInput");
    clipboardInput.value = text;
    clipboardInput.select();
    document.execCommand("copy");
    clipboardInput.value = "";
    openInNewTab(text)
}

//Function to open in new tab
function openInNewTab(text) {
    url='/djshorthand.html?x='+text
    var newTab = window.open('', 'DJshorthand');

    // This part is executed in the context of the newly opened window/tab.
    if (newTab.location.href === "about:blank") {
        // If the tab is new and hasn't loaded any page yet, load our URL
        newTab.location.href = url;
    } else {
        // If the tab already has content, refresh with the new URL
        newTab.location.replace(url);
    }

    // Bring the tab to front
    newTab.focus();
 
};


// Attach the search function to the button click event
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", performSearch);
