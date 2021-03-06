import { useDB } from '@db';
import { Config } from '@server/config';
import type {
   SyncHandler,
   AsyncHandler,
   Response,
   Request,
   NextFunction
} from '@tinyhttp/app';
import type { Entry, Header, User } from '@type';
export function defineSyncHandler(fn: SyncHandler): SyncHandler {
   return fn;
}
export function defineAsyncHandler(fn: AsyncHandler): AsyncHandler {
   return fn;
}
export function defineMiddleware(
   fn: (req: Request, res: Response, next: NextFunction) => void
) {
   return fn;
}

export function trimLength(value: string) {
   return value.trim().length;
}

export function responseError(res: Response, msg: string, status = 400) {
   res.status(status).json({
      type: status === 404 ? 'not found' : 'error',
      msg
   });
   return;
}

export function responseSuccess(res: Response, msg: string) {
   res.status(200).json({
      type: 'success',
      msg
   });
   return;
}

export function sanitizeHeaderName(name: string) {
   // ilk önce baştaki ve sondaki boşlukları silelim.
   let sanitized = name.trim();

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

export function removeMultipleTabs(str: string) {
   return str.replace(/\t\t+/g, '\t');
}

export function tabsToSpace(str: string) {
   return str.replace(/\t/, ' ');
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

export function minuteToMiliseconds(minute: number) {
   return minute * 60 * 1000;
}

export function getEntryPageOfHeader(header_id: string, entry_id: string) {
   const db = useDB();
   const header = db.get('headers').find({ id: header_id });

   const entryIndex = header.value().entries.findIndex(v => {
      return v.id === entry_id;
   });
   const entryPage = Math.ceil((entryIndex + 1) / Config.entry.entryPerPage);
   return entryPage;
}

interface ILikeEntryCheck {
   auth: User;
   header_id: Header['id'];
   entry_id: Entry['id'];
}
export function checkDidUserLikeEntry({
   auth,
   header_id,
   entry_id
}: ILikeEntryCheck) {
   const db = useDB();
   const user = db.get('users').find({ id: auth.id });
   const likeResponse = user
      .get('likes')
      .find({
         entry_id,
         header_id
      })
      .value();

   if (likeResponse) {
      return true;
   } else {
      return false;
   }
}
