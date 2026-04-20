const fs = require('fs');

const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    } else {
      filelist.push(dir + '/' + file);
    }
  });
  return filelist;
};

const files = walkSync('./src').filter(f => f.endsWith('.jsx'));

files.forEach(file => {
   let content = fs.readFileSync(file, 'utf8');

   // Gradients
   content = content.replace(/from-blue-600 to-cyan-500/g, 'from-gray-900 to-gray-500');
   
   // Buttons
   content = content.replace(/bg-blue-600 hover:bg-blue-700/g, 'bg-linear-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 shadow-md shadow-black/20');
   content = content.replace(/bg-blue-600/g, 'bg-gray-900');
   content = content.replace(/hover:bg-blue-600/g, 'hover:bg-black');
   content = content.replace(/hover:bg-blue-700/g, 'hover:bg-gray-800');
   
   // Text
   content = content.replace(/text-blue-600/g, 'text-gray-900');
   content = content.replace(/hover:text-blue-600/g, 'hover:text-black font-semibold');
   
   // Background styling for pills
   content = content.replace(/bg-blue-50/g, 'bg-gray-100');
   
   // Focus states
   content = content.replace(/focus:border-blue-500/g, 'focus:border-gray-900');
   content = content.replace(/focus:ring-blue-500\/10/g, 'focus:ring-gray-900/10');
   
   // Misc App specific
   content = content.replace(/selection:bg-blue-100/g, 'selection:bg-gray-200');
   content = content.replace(/selection:text-blue-900/g, 'selection:text-black');
   content = content.replace(/shadow-blue-500\/30/g, 'shadow-gray-900/20');

   fs.writeFileSync(file, content);
});
console.log("Theme updated successfully!");
