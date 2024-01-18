import generateUniqueId from 'generate-unique-id'
 //generer ID
 const id1=generateUniqueId({
  length:1,
  useLetters: false,
});
 const id2=generateUniqueId({
  length:1,
  useLetters: false,
});
 const id3=generateUniqueId({
  length:1,
  useLetters: false,
});
 
 let todos=[
  {
    id: id1,
    "title": "todo 1",
    "completed": false
  },
  {
    id: id2,
    "title": "todo 2",
    "completed": false
  },
  {
    id: id3,
    "title": "todo 3",
    "completed": true
  },  
  ]
  export default todos;
  
