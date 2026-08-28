// Bundled asset imports for 100% reliable rendering across all browsers, CDNs, and devices
import honeyFlowersWebp from '../assets/images/honey_flowers.webp';
import honeyFlowersJpg from '../assets/images/honey_flowers.jpg';

import honeySidrWebp from '../assets/images/honey_sidr.webp';
import honeySidrJpg from '../assets/images/honey_sidr.jpg';

import honeyHarshaWebp from '../assets/images/honey_harsha.webp';
import honeyHarshaJpg from '../assets/images/honey_harsha.jpg';

import amlouAlmondWebp from '../assets/images/amlou_almond.webp';
import amlouAlmondJpg from '../assets/images/amlou_almond.jpg';

import amlouWalnutWebp from '../assets/images/amlou_walnut.webp';
import amlouWalnutJpg from '../assets/images/amlou_walnut.jpg';

import honeyRareWildWebp from '../assets/images/honey_rare_wild.webp';
import honeyRareWildJpg from '../assets/images/honey_rare_wild.jpg';

import honeyChendgouraWebp from '../assets/images/honey_chendgoura.webp';
import honeyChendgouraJpg from '../assets/images/honey_chendgoura.jpg';

import avatarAminaWebp from '../assets/images/avatar_amina.webp';
import avatarAminaJpg from '../assets/images/avatar_amina.jpg';

import avatarRachidWebp from '../assets/images/avatar_rachid.webp';
import avatarRachidJpg from '../assets/images/avatar_rachid.jpg';

import avatarFatimaWebp from '../assets/images/avatar_fatima.webp';
import avatarFatimaJpg from '../assets/images/avatar_fatima.jpg';

import avatarFadhmaWebp from '../assets/images/avatar_fadhma.webp';
import avatarFadhmaJpg from '../assets/images/avatar_fadhma.jpg';

import coopCraftWebp from '../assets/images/cooperative_hands_craft.webp';
import coopCraftJpg from '../assets/images/cooperative_hands_craft.jpg';

import heroBgWebp from '../assets/images/hero-background-v2.webp';
import heroBgJpg from '../assets/images/hero-background-v2.jpg';

export interface ImageAssetPair {
  webp: string;
  jpg: string;
  isWebpAvailable?: boolean;
}

export const PRODUCT_IMAGE_MAP: Record<string, ImageAssetPair> = {
  // Official Authentic Tadmamte Products Only
  'tadmamte-honey-sidr': { webp: honeySidrWebp, jpg: honeySidrJpg, isWebpAvailable: true },
  'tadmamte-amlou-almond': { webp: amlouAlmondWebp, jpg: amlouAlmondJpg, isWebpAvailable: true },
  'tadmamte-honey-rare-wild': { webp: honeyRareWildWebp, jpg: honeyRareWildJpg, isWebpAvailable: true },
};

export const AVATAR_IMAGE_MAP: Record<string, ImageAssetPair> = {
  't-1': { webp: avatarAminaWebp, jpg: avatarAminaJpg, isWebpAvailable: true },
  't-2': { webp: avatarRachidWebp, jpg: avatarRachidJpg, isWebpAvailable: true },
  't-3': { webp: avatarFatimaWebp, jpg: avatarFatimaJpg, isWebpAvailable: true },
  't-4': { webp: avatarFadhmaWebp, jpg: avatarFadhmaJpg, isWebpAvailable: true },
};

export const STORY_IMAGE: ImageAssetPair = {
  webp: coopCraftWebp,
  jpg: coopCraftJpg,
  isWebpAvailable: true,
};

export const HERO_IMAGE: ImageAssetPair = {
  webp: heroBgWebp,
  jpg: heroBgJpg,
  isWebpAvailable: true,
};

/**
 * Resolves any product image string to guaranteed working URLs.
 * CRITICAL: Always prioritizes the user's actual uploaded database image/photo first!
 */
export function resolveProductImage(
  productId?: string, 
  rawImage?: string,
  productName?: string,
  category?: string,
  description?: string
): ImageAssetPair {
  // 1. ABSOLUTE PRIORITY: If the product has an image in the database (Firebase Storage URL, HTTPS URL, base64 data URL, blob, or local path)
  if (rawImage && typeof rawImage === 'string') {
    const trimmed = rawImage.trim();
    if (trimmed.length > 0) {
      const isWebp = trimmed.startsWith('data:image/webp') || trimmed.endsWith('.webp');
      return {
        webp: trimmed,
        jpg: trimmed,
        isWebpAvailable: isWebp,
      };
    }
  }

  // 2. Exact match in bundled image map by productId
  if (productId && PRODUCT_IMAGE_MAP[productId]) {
    return PRODUCT_IMAGE_MAP[productId];
  }

  // 3. Fallback for the 3 authentic categories only
  if (category === 'amlou') {
    return PRODUCT_IMAGE_MAP['tadmamte-amlou-almond'];
  }
  if (category === 'honey') {
    return PRODUCT_IMAGE_MAP['tadmamte-honey-sidr'];
  }

  // 4. Default fallback to Sidr honey
  return PRODUCT_IMAGE_MAP['tadmamte-honey-sidr'] || { webp: honeySidrWebp, jpg: honeySidrJpg, isWebpAvailable: true };
}

/**
 * Resolves avatar image for testimonials
 */
export function resolveAvatarImage(id?: string, rawAvatar?: string): ImageAssetPair {
  if (id && AVATAR_IMAGE_MAP[id]) {
    return AVATAR_IMAGE_MAP[id];
  }
  if (rawAvatar && typeof rawAvatar === 'string') {
    const trimmed = rawAvatar.trim();
    if (trimmed.startsWith('data:') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return { webp: trimmed, jpg: trimmed, isWebpAvailable: false };
    }
    const q = rawAvatar.toLowerCase();
    if (q.includes('amina')) return AVATAR_IMAGE_MAP['t-1'];
    if (q.includes('rachid')) return AVATAR_IMAGE_MAP['t-2'];
    if (q.includes('fatima')) return AVATAR_IMAGE_MAP['t-3'];
    if (q.includes('fadhma')) return AVATAR_IMAGE_MAP['t-4'];
  }
  return AVATAR_IMAGE_MAP['t-1'];
}

