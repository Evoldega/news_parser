export const sendAsTextFile = async (ctx, text, options = {}) => {
  const { 
    filename = 'message.txt',
    caption = 'Текст сообщения',
    parseMode,
    disableNotification
  } = options;
  
  const buffer = Buffer.from(text, 'utf-8');
  
  return [await ctx.replyWithDocument({
    source: buffer,
    filename
  }, {
    caption,
    parse_mode: parseMode,
    disable_notification: disableNotification
  })];
};

export const getMessageContent = (
  content,
  date,
  views
) => {
  const message = `
${content}

Дата: ${new Date(date).toLocaleString()}
Просмотры: ${views}
`
  return message;
};