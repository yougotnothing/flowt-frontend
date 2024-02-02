export const handleShowErrorField = (value: string, type: 'errors' | 'values' = 'errors', field: any): string | undefined => {
  switch(value) {
    case "name":
      if(type === 'errors') {
        return field.errors.name;
      }else{
        return field.values.name;
      }
    case "surname":
      if(type === 'errors') {
        return field.errors.surname;
      }else{
        return field.values.surname;
      }
    case "passportNumber":
      if(type === 'errors') {
        return field.errors.passportNumber;
      }else{
        return field.values.passportNumber;
      }
    default: 
      break;
  }
}