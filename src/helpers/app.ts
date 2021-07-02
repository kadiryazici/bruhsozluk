import once from 'lodash.once';

export function sanitizeHeaderName(name: string) {
   // ilk önce baştaki ve sondaki boşlukları silelim.
   let sanitized = name.trim();
   sanitized = name.slice(0, 50);

   const upperCase = `QWERTYUIOPĞÜASDFGHJKLŞİZXCVBNMÖÇ`;
   const lowerCase = 'qwertyuıopğüasdfghjklşizxcvbnmöç';
   const numbers = '0123456789';
   const specialCharacters = "'%.$#-_` ";
   const supportedCharacters =
      numbers + specialCharacters + lowerCase + upperCase;

   // şu karakterlerden kurtutalım
   sanitized = sanitized
      .replace(/  +/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/\t/g, ' ')
      .replace(/\f/g, ' ')
      .replace(/\v/g, ' ');

   sanitized = replaceHyphensToSpaces(sanitized);

   // string'i önce diziye çeviriyorum sonra .map ile döngüleyip karakter destekleniyorsa geri döndürüyorum.
   // deskteklenmeyen karakterleri siliyoruz
   // girdi: *?-?qw$ çıktı: qw$
   const trimmedArray = [...sanitized].map(char => {
      if (supportedCharacters.indexOf(char) === -1) {
         return '';
      } else {
         return char;
      }
   });

   sanitized = trimmedArray.join('');

   // başlıktaki tüm özel karakterleri geçici olarak siliyorum
   // girdi ################ olunca çıktı bomboş iken
   // girdi #########q######### olduğunda çıktı sadece "q"
   const tempSanitized = [...sanitized].filter(letter => {
      if (specialCharacters.indexOf(letter) !== -1) return false;
      else return true;
   });

   // eğer başlığın özel karakterler olmadan ki halinde 1 karakterden fazla yoksa geriye boş bir yazı döndürüyorum.
   if (tempSanitized.length < 1) {
      return '';
   }

   // sözlük ` tırnağını ' tırnağına çevirdiği için bu gerekli.
   sanitized = sanitized.replace(/\`/g, "'");

   // düzeltilmiş başlık çıktısı
   // nolur nolmaz diye trim
   return sanitized.trim().toLocaleLowerCase('tr-TR');
}

/**
 * @description Replaces Hyphens(-) to Spaces(  ).
 */
function replaceHyphensToSpaces(str: string): string {
   return str.replace('-', ' ');
}

export function removeMultipleTabs(str: string) {
   return str.replace(/\t\t+/g, '\t');
}

export function reduceLinebreaksMoreThanThree(str: string) {
   return str.replace(/\n\n\n+/, '\n\n');
}

export function removeMultipleSpaces(str: string): string {
   return str.replace(/  +/g, ' ');
}

export function sanitizeEntryBody(str: string) {
   str = removeMultipleSpaces(str);
   str = removeMultipleTabs(str);
   str = reduceLinebreaksMoreThanThree(str);
   str = str.trim();
   return str;
}

export function useFocus2ElementOnce() {
   const focusToElement = once((el: HTMLElement) => {
      el.scrollIntoView({
         block: 'center',
         inline: 'center',
         behavior: 'smooth'
      });
      el.setAttribute('data-highlight-anim', '');
   });
   return focusToElement;
}
