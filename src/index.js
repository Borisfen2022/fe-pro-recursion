/**
 * Принимает два объекта, должна вернуть или true или false, если объекты идентичны внутри, возвращает
 * true, если есть различие, false. То есть проверяет каждое свойство, вне зависимости от вложенности,
 * делаем через рекурсию(а других вариантов и нет)
 */
export const deepEqual = (obj, anotherObject) => {
  if (obj === anotherObject) return true;

  if (
    obj === null ||
    anotherObject === null ||
    typeof obj !== 'object' ||
    typeof anotherObject !== 'object'
  )
    return false;

  let objkeys = Object.keys(obj);
  let anotherObjectkeys = Object.keys(anotherObject);

  if (objkeys.length !== anotherObjectkeys.length) return false;

  for (let key of objkeys) {
    if (
      !anotherObjectkeys.includes(key) ||
      !deepEqual(obj[key], anotherObject[key])
    )
      return false;
  }
  return true;
};

/**
 * Принимает объект, возвращает его глубокую копию, то есть ни одно свойство
 * не является ссылочным у другого объекта, точно возвращает новое.
 * Если это массив, возвращает новый массив(map) и если элемент массива не простого типа,
 * то тогда в рекурсию. С объектом также. Поскольку массив при typeof возвращает object, чтобы
 * их различить берем метод Array.isArray и он на массивах вернет тру
 */
export const deepCopy = (obj) => {
  let outObject, key;
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  outObject = Array.isArray(obj) ? [] : {};

  if (Array.isArray(obj)) {
    outObject = obj.map((item) => deepCopy(item));
  } else {
    for (key in obj) {
      outObject[key] = deepCopy(obj[key]);
    }
  }
  return outObject;
};

/**
 * Мы передаем объект, и должны вернуть массив уникальных названий свойств
 * То есть если у нас объект { name: { bohdan: { name: 'test' } } } вернет ['name', 'bohdan']
 */
export const getAllObjectKeys = (obj) => {
  let keys = Object.keys(obj);

  for (let key of keys) {
    if (typeof obj[key] === 'object') {
      [...keys, ...getAllObjectKeys(obj[key])].forEach((objKey) => {
        if (!keys.includes(objKey)) {
          keys = [...keys, objKey];
        }
      });
    } else {
      if (!keys.includes(key)) {
        keys = [...keys, key];
      }
    }
  }
  return keys;
};
