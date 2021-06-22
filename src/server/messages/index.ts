export class Msg {
   static app = {
      error: {
         msg: 'Böyle bir adres bulunmuyor ya da öngörülemeyen bir hata oluştu.'
      }
   };

   static auth = {
      error: {
         msg: 'Kullanıcı kimliği hatası.'
      }
   };

   static add_entry = {
      error: {
         headerIdNeeded: `Başlık ID'si gerekiyor.`,
         missingData: 'Lütfen verileri doğru gönderin.',
         bodyNeeded: 'Entry içeriği gerekiyor.',
         wrongHeaderId: `Hatalı başlık ID'si.`,
         bodyShouldHaveAtLeastOneLetter:
            'Entry içeriği en az 1 karakter içermelidir.'
      },
      success: {
         createdHeader: 'Başlık oluşturuldu.'
      }
   };

   static add_header = {
      error: {
         nameNeeded: 'Başlık ismi gerekiyor.',
         headerExists: 'Bu başlık zaten var.'
      }
   };

   static delete_header = {
      error: {
         missingParameters: 'Yeterli parametre gönderilmedi.',
         headerDoesNotExist: 'Başlık bulunamadı.',
         headerIdNeeded: `Başlık ID'si gerekiyor.`
      },
      success: {
         msg: 'Başlık başarıyla silindi. '
      }
   };

   static delete_entry = {
      error: {
         wrongHeaderId: `Hatalı başlık ID'si.`,
         wrongEntryID: `Hatalı entry ID'si.`,
         missingParameters: 'Bazı parametreler eksik.'
      },
      success: {
         msg: 'Entry başarıyla silindi. '
      }
   };

   static login = {
      error: {
         pleaseInputUsernameAndPasswordCorrectly:
            'Lütfen kullanıcı adı ve şifreyi doğru girin.',
         errorOccuredWhileLoggingIn: 'Giriş yapma kısmında bir hata oluştu.'
      }
   };

   static signup = {
      error: {
         errorMessage: 'Lütfen kutucukları doğru doldurun.',
         errorUserAlreadyExists: 'Kullanıcı zaten bulunuyor.',
         errorOccuredWhileCreatingNewUser:
            'Kullanıcı oluştururken bir hata oluştu.',
         usernameShouldBeBetween3and20:
            'Kullanıcı adının uzunluğu 3 ila 20 karakter arasında olmalı.',
         passwordShouldBeBetween6and25:
            'Şifrenin uzunluğu 6 ila 20 karakter arasında olmalı.',
         username3_20AndPassword6_25:
            'KUllanıcı adı 3 ila 20, şifre 6 ila 25 karakter uzunluğunda olmalı.'
      },
      success: {
         userCreatedSuccessfully: 'Kullanıcı başarıyla oluşturuldu.'
      }
   };

   static get_header = {
      error: {
         wrongHeaderID: `Başlık ID'si eşleşmiyor`,
         neededParams: 'Gerekli parametreler eksik.'
      }
   };

   static get_entry = {
      error: {
         missingParameters: 'Gerekli parametreler eksik.',
         headerIdDoesNotMatch: `Başlık ID'si eşleşmiyor.`,
         entryIdDoesNotMatch: `Entry ID'si eşleşmiyor.`
      }
   };

   static get_verification = {
      error: {
         msg: 'Yanlış kullanıcı kimliği ya da bir hata oluştu.'
      },
      success: {
         msg: 'Doğru kullanıcı kimliği.'
      }
   };

   static post_likeEntry = {
      error: {
         msg: 'Ya hata oldu ya eksik bilgi verdin ya da tekrar beğenmeye çalışıyorsun.'
      },
      success: {
         msg: 'Ayy Şimdi bunu beğendim mi ben?'
      }
   };

   static post_unlikeEntry = {
      error: {
         msg: 'Ya hata oldu ya eksik bilgi verdin ya da zaten bunu beğenmedin.'
      },
      success: {
         msg: 'Hıh sevmemiştim zaten!'
      }
   };

   static get_liked_entries_by_user = {
      error: {
         missingParams: 'Bazı parametreler eksik.',
         userNotFound: `Böyle bir kullanıcı bulamadık.`
      }
   };

   static post_verify_header = {
      error: {
         cannotCreate: 'Bu başlığı açamayız.',
         alreadyExists: 'Bu başlık zaten var.',
         missingParameters: 'Bazı parametreler eksik'
      },
      success: {
         msg: 'Bu başlık açılabilir.'
      }
   };

   static left_content = {
      error: {
         headerNotFound: 'Başlık Bulunamadı.'
      },
      success: 'Başlık başarılı bir şekilde sol kısma eklendi.'
   };

   static Likes = {
      error: {
         missingParameteres: 'Bazı parametrelet eksik.'
      }
   };
}
