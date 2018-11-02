module.exports = survey => {
  if(process.env.NODE_ENV === 'production'){
    return (
      '<body>'+
        '<div style="text-align: center;">'+
        '<h1> MailChimp </h1>'+
        'sknsdklflaskfnsldkfnslkfnsdlkfnflnsdslkfsldkfnsd'+
        '<h2> I would like your input, please anser the following question </h2>'+
        '<h3>' + survey.body + '</h3>'+
        '<ul>'+
          '<li><a href="https://fast-bastion-94038.herokuapp.com'+survey.id+'/yes"> yes </a><li>'+
          '<li><a href="https://fast-bastion-94038.herokuapp.com'+survey.id+'/no"> no </a><li>'+
        '</ul>'+
      '</div>'+
      '</body>'+
      '</html>'
    )
  }
  return ('<html>'+
  '<body>'+
    '<div style="text-align: center;">'+
    '<h1> MailChimp </h1>'+
    'sknsdklflaskfnsldkfnslkfnsdlkfnflnsdslkfsldkfnsd'+
    '<h2> I would like your input, please anser the following question </h2>'+
    '<h3>' + survey.body + '</h3>'+
    '<ul>'+
      '<li><a href="http://localhost:3000/api/surveys/'+survey.id+'/yes"> yes </a><li>'+
      '<li><a href="http://localhost:3000/api/surveys/'+survey.id+'/no"> no </a><li>'+
    '</ul>'+
  '</div>'+
  '</body>'+
  '</html>')
}
