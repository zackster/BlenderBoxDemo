# encoding: utf-8

class State < ActiveRecord::Base

  validate :bodybg_must_be_hex_format

  def bodybg_must_be_hex_format
    unless /^#[A-Fa-f0-9]{6}$/ =~ bodybg
      errors.add(:bodybg, 'must be a valid hex color')
    end
  end
end
