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

export function removeMultipleTabs(str: string) {
   return str.replace(/\t\t+/g, '\t');
}

export function reduceLinebreaksMoreThanThree(str: string) {
   return str.replace(/\n\n\n+/, '\n\n');
}

export function sanitizeEntryBody(str: string) {
   str = removeMultipleSpaces(str);
   str = removeMultipleTabs(str);
   str = reduceLinebreaksMoreThanThree(str);
   str = str.trim();
   return str;
}

export function focusToElement(el: HTMLElement) {
   el.scrollIntoView({
      block: 'center',
      inline: 'center',
      behavior: 'smooth'
   });
   el.setAttribute('data-highlight-anim', '');
}

export function msToDateString(ms: number, includeHour = true): string {
   const add0 = (num: number) => {
      const _num = num.toString();
      return _num.length > 1 ? num : `0` + num;
   };

   const date = new Date(ms);

   const hour = add0(date.getHours());
   const minute = add0(date.getMinutes());

   const day = add0(date.getDate());
   const month = add0(date.getMonth() + 1);
   const year = date.getFullYear();

   return `${day}/${month}/${year} ${includeHour ? ` ${hour}:${minute}` : ''}`;
}

export function sanitizeUserName(username: string) {
   const supportedLetters =
      '1234567890' + 'abcçdefgğhıijklmnoöprsşjtuüvyz' + 'qwx' + ' ';

   username = replaceHyphensToSpaces(username);

   let usernameArray = [...username.toLocaleLowerCase('tr-TR')];
   usernameArray = usernameArray.map(letter => {
      if (supportedLetters.includes(letter)) return letter;
      else return '';
   });
   username = usernameArray.join('').trim();

   username = removeMultipleSpaces(username);
   username = replaceTurkishLetters(username);
   return username;
}

export function removeMultipleSpaces(str: string): string {
   return str.replace(/  +/g, ' ');
}

/**
 * @description Replaces Hyphens(-) to Spaces(  ).
 */
export function replaceHyphensToSpaces(str: string): string {
   const regex = /\-/g;
   return str.replace(regex, ' ');
}

export function replaceTurkishLetters(str: string): string {
   const trToEn = [
      ['ı', 'i'],
      ['ğ', 'g'],
      ['ü', 'u'],
      ['ş', 's'],
      ['ö', 'o'],
      ['ç', 'c']
   ];
   for (let [tr, en] of trToEn) {
      const regex = RegExp(`\\${tr}`, 'g');
      str = str.replace(regex, en);
   }
   return str;
}

export function replaceSpacesToHyphens(str: string) {
   const regex = / /g;
   return str.replace(regex, ' ');
}

export function fixURLUsername(username: string) {
   username = sanitizeUserName(username);
   username = replaceSpacesToHyphens(username);
   return username;
}
