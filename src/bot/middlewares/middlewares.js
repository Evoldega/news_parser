import { config } from '../config.js';

export const logger = async (ctx, next) => {
  const start = Date.now();
  
  try {
    await next();
  } catch (error) {
    console.error(`[ERROR] ${new Date().toISOString()}:`, error);
    throw error;
  }
  
  const responseTime = Date.now() - start;
  const updateType = ctx.updateType || 'unknown';
  
  console.log(
    `[${new Date().toISOString()}]`,
    `User: ${ctx.from?.id || 'unknown'}`,
    `Type: ${updateType}`,
    `Time: ${responseTime}ms`
  );
};

export const analytics = async (ctx, next) => {

  const {
    from,
    text,
    updateType
  } = ctx;
    
  const analyticsData = {
    timestamp: new Date().toISOString(),
    from: { ...from, text },
    updateType: updateType,
  };
  
  ctx.state.analytics = analyticsData;
  
  await next();
  
  console.log('Analytics:', analyticsData);
};

// Middleware для кэширования
export const cacheMiddleware = (cache) => async (ctx, next) => {
  const cacheKey = `user:${ctx.from?.id}`;
  const cachedData = await cache.get(cacheKey);
  
  if (cachedData) {
    ctx.state.cached = cachedData;
  }
  
  await next();
  
  if (ctx.state.userData) {
    await cache.set(cacheKey, ctx.state.userData, 3600);
  }
};