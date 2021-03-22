export const Msg = {
   app: {
      error: {
         msg: 'Böyle bir adres bulunmuyor ya da öngörülemeyen bir hata oluştu.',
      },
   },

   auth: {
      error: {
         msg: 'Kullanıcı kimliği hatası.',
      },
   },

   add_entry: {
      error: {
         headerIdNeeded: `Başlık ID'si gerekiyor.`,
         missingData: 'Lütfen verileri doğru gönderin.',
         bodyNeeded: 'Entry içeriği gerekiyor.',
         wrongHeaderId: `Hatalı başlık ID'si.`,
         bodyShouldHaveAtLeastOneLetter:
            'Entry içeriği en az 1 karakter içermelidir.',
      },
      success: {
         createdHeader: 'Başlık oluşturuldu.',
      },
   },

   add_header: {
      error: {
         nameNeeded: 'Başlık ismi gerekiyor.',
         headerExists: 'Bu başlık zaten var.',
      },
   },

   delete_header: {
      error: {
         missingParameters: 'Yeterli parametre gönderilmedi.',
         headerDoesNotExist: 'Başlık bulunamadı.',
         headerIdNeeded: `Başlık ID'si gerekiyor.`,
      },
      success: {
         msg: 'Başlık başarıyla silindi. ',
      },
   },

   login: {
      error: {
         pleaseInputUsernameAndPasswordCorrectly:
            'Lütfen kullanıcı adı ve şifreyi doğru girin.',
         errorOccuredWhileLoggingIn: 'Giriş yapma kısmında bir hata oluştu.',
      },
   },

   signup: {
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
            'KUllanıcı adı 3 ila 20, şifre 6 ila 25 karakter uzunluğunda olmalı.',
      },
      success: {
         userCreatedSuccessfully: 'Kullanıcı başarıyla oluşturuldu.',
      },
   },

   get_header: {
      error: {
         wrongHeaderID: `Başlık ID'si eşleşmiyor`,
         neededParams: 'Gerekli parametreler eksik.',
      },
   },
};
