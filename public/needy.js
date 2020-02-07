let checked = 'checked';

const loadFile = (event) => {
    const image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
  };

 