/**
 * This class stores global constants between the client and server.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

module.exports = {
  WORLD_MIN: 0,
  WORLD_MAX: 3640,
  WORLD_PADDING: 30,

  DRAWING_NAME_FONT: '18px Helvetica',
  DRAWING_NAME_COLOR: 'lightBlue',
  DRAWING_HP_COLOR: 'red',
  DRAWING_HP_MISSING_COLOR: 'grey',
  DRAWING_ENERGY_COLOR: 'blue',
  DRAWING_ENERGY_MISSING_COLOR: 'grey',
  DRAWING_IMG_BASE_PATH: 'img',
  DRAWING_IMG_SELF_TANK: 'selfTank/self_tank',
  DRAWING_IMG_COLLECT_TURRET: 'guns/collect_turret',
  DRAWING_IMG_ILLUSION_TURRET: 'guns/illusion_turret',
  DRAWING_IMG_LAZER_TURRET: 'guns/lazer_turret',
  DRAWING_IMG_SLIME_TURRET: 'guns/slime_turret',
  DRAWING_IMG_TURRET: 'guns/turret',
  DRAWING_IMG_OTHER_TANK: 'other_tank',
  DRAWING_IMG_OTHER_TURRET: 'other_turret',
  DRAWING_IMG_SHIELD: 'shield',
  DRAWING_IMG_PIPE_BULLET: 'bullets/pipe_bullet',
  DRAWING_IMG_BAD_BULLET: 'bullets/badBullet',
  DRAWING_IMG_ILLUSION_BULLET: 'bullets/illusionBullet',
  DRAWING_IMG_LAZER_BULLET: 'bullets/lazer_bullet',
  DRAWING_IMG_SLIME_BULLET: 'bullets/slime_bullet',
  DRAWING_IMG_TILE: 'hexaTile',
  DRAWING_IMG_KEYS: [
    'selfTank/self_tank', 'guns/turret', 'other_tank', 'other_turret', 'shield',
    'bullets/pipe_bullet', 'bullets/lazer_bullet', 'bullets/slime_bullet', 'hexaTile', 'bullets/badBullet', 
    'bullets/illusionBullet', 'guns/collect_turret', 'guns/illusion_turret',
    'guns/lazer_turret', 'guns/slime_turret'
  ],
  DRAWING_TILE_SIZE: 364,

  VIEWPORT_STICKINESS: 0.004,

  SOCKET_UPDATE: 'update',
  SOCKET_NEW_PLAYER: 'new-player',
  SOCKET_PLAYER_ACTION: 'player-action',
  SOCKET_CHAT_CLIENT_SERVER: 'chat-client-to-server',
  SOCKET_CHAT_SERVER_CLIENT: 'chat-server-to-client',
  SOCKET_DISCONNECT: 'disconnect',

  PLAYER_TURN_RATE: 0.005,
  PLAYER_DEFAULT_SPEED: 0.9,
  PLAYER_SHOT_COOLDOWN: 800,
  PLAYER_DASH_COOLDOWN: 8000,
  PLAYER_DASH_DURATION: 100,
  PLAYER_DASH_SPEED: 400,
  PLAYER_BOMB_DURATION: 100000,
  PLAYER_BOMB_COOLDOWN: 8000,
  PLAYER_INVIS_CASTE: 4000,
  PLAYER_DEFAULT_HITBOX_SIZE: 20,
  PLAYER_SHIELD_HITBOX_SIZE: 45,
  PLAYER_MAX_HEALTH: 100,
  PLAYER_MAX_ENERGY: 100,
  PLAYER_START_ENERGY: 75,

  BULLET_DEFAULT_DAMAGE: 5,
  BULLET_SPEED: 2,
  BULLET_MAX_TRAVEL_DISTANCE_SQ: 1000 * 1000,
  BULLET_HITBOX_SIZE: 10,

  POWERUP_HITBOX_SIZE: 5,
  POWERUP_MAX_COUNT: 50,
  POWERUP_MIN_DURATION: 5000,
  POWERUP_MAX_DURATION: 15000,
  POWERUP_HEALTHPACK: 'healthpack',
  POWERUP_BOMB: 'bomb',
  POWERUP_SHOTGUN: 'shotgun',
  POWERUP_RAPIDFIRE: 'rapidfire',
  POWERUP_SPEEDBOOST: 'speedboost',
  POWERUP_SHIELD: 'shield',
  POWERUP_BOMB: 'bomb',
  POWERUP_KEYS: [
    'healthpack',
    'bomb'
    // 'shotgun',
    // 'rapidfire',
    // 'speedboost',
    // 'shield'
  ],
  EFFECT_SLIME: 'slime',
  EFFECT_KEYS: [
    'slime'
  ],
  POWERUP_DATA: {
    healthpack: { MIN: 5, MAX: 10 },
    shotgun: { MIN: 1, MAX: 2 },
    rapidfire: { MIN: 2, MAX: 4 },
    speedboost: { MIN: 1.2, MAX: 1.8 },
    shield: { MIN: 1, MAX: 4 }
  },

  EFFECT_DATA: {
    slime: {speed:0.1, duration:4000}
  },

  SPELLS: ['dash', 'bomb'],
  START_SPELL_TIMES: ['lastDashTime', 'lastBombTime'],

  LAZER_ENERGY:5,
  ILLUSION_ENERGY:5,
  SLIME_ENERGY:5,
  GUN_TYPES: {
    'pipe': 'guns/turret',
    'collecter': 'guns/collect_turret',
    'lazer': 'guns/lazer_turret',
    'illusion': 'guns/illusion_turret',
    'slime': 'guns/slime_turret'
  },
  PRICES:{
    'pipe': 5,
    'collecter': 0,
    'lazer': 20,
    'illusion': 20,
    'slime': 11,
    'dash': 10,
    'invis': 10,
    'bomb': 10
  }
}
