export const Config = {
   auth: {
      usernameMax: 20,
      usernameMin: 3,
      passwordMax: 25,
      passwordMin: 6,
   },
   add_header: {
      headerMax: 50,
      headerMin: 1,
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
};
