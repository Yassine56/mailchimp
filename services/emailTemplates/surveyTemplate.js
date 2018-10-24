module.exports = survey => {
  return '<div>'+

    '<h1> MailChimp </h1>'+
    '<h2> did you enjoy our service ?? </h2>'+
    '<ul>'+
      '<li><a href="http://localhost:3000/thanks"> yes </a><li>'+
      '<li><a href="http://localhost:3000/thanks"> no </a><li>'+
    '</ul>' + survey.body +

  '</div>' ;
};
