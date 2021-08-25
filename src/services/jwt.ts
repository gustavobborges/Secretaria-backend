import jwt from 'jsonwebtoken';

const secret = "FEWFEEFWewd4d3e3e3d43d3DDE"

export const sign = payload => jwt.sign(payload, secret, { expiresIn: 86400 })
export const decode = token => jwt.verify(token, secret)

