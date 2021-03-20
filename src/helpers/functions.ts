import type {
   SyncHandler,
   AsyncHandler,
   Response,
   Request,
   NextFunction,
} from '@tinyhttp/app';

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
      msg,
   });
   return;
}

export function responseSuccess(res: Response, msg: string) {
   res.status(200).json({
      type: 'success',
      msg,
   });
   return;
}

export function sanitizeHeaderName(name: string) {
   // ilk önce baştaki ve sondaki boşlukları silelim.
   let sanitized = name.trim();

   const upperCase = `QWERTYUIOPĞÜASDFGHJKLŞİZXCVBNMÖÇ`;
   const lowerCase = 'qwertyuıopğüasdfghjklşizxcvbnmöç';
   const specialCharacters = "'%.$#` ";
   const supportedCharacters = specialCharacters + lowerCase + upperCase;

   // şu karakterlerden kurtutalım
   sanitized = sanitized
      .replace(/  +/g, '')
      .replace(/\n/g, '')
      .replace(/\t/g, '')
      .replace(/\f/g, '')
      .replace(/\v/g, '');

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
   return sanitized.trim();
}
