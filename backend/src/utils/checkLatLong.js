/** ATITUDE E LONGITUDE DEVEM ESTAR AMBAS VAZIAS OU PREENCHIDAS
 *  Retorna true para OK e false para Informações inválidas
 */
module.exports = function checkLatLongIsValid(lat, long) {
  if (lat && long) {
    return true;
  }
  if (!lat && !long) {
    return true;
  }
  return false;
};
