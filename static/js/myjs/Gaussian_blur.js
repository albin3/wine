//高斯模糊  参数说明:width:canvas对象或者是数据体对象的宽，height:canvas或者是数据体对象的高，
//radius:模糊取值半径(默认为3)，sigma:方差取值(默认为1)
/**
 * [Gaussian_blur description]
 * @param {[type]} data   [description]
 * @param {[type]} width  [description]
 * @param {[type]} height [description]
 * @param {[type]} radius [description]
 * @param {[type]} sigma  [description]
 */
function Gaussian_blur(data, width, height, radius, sigma) {
  var gaussMatrix = [],
      gaussSum = 0,
      x, y,
      r, g, b, a,
      i, j, k, len;

  radius = Math.floor(radius) || 3;
  sigma = sigma || radius / 3;

  a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
  b = -1 / (2 * sigma * sigma);
  //生成高斯矩阵
  for (i = 0, x = -radius; x <= radius; x++, i++) {
    g = a * Math.exp(b * x * x);
    gaussMatrix[i] = g;
    gaussSum += g;

  }

  //归一化, 保证高斯矩阵的值在[0,1]之间
  for (i = 0, len = gaussMatrix.length; i < len; i++) {
    gaussMatrix[i] /= gaussSum;
  }

  //x方向
  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      r = g = b = a = 0;
      gaussSum = 0;
      for (j = -radius; j <= radius; j++) {
        k = x + j; //  a=j+row;
        if (k >= 0 && k < width) { //确保 k 没超出 x 的范围

          i = (y * width + k) * 4;
          r += data[i] * gaussMatrix[j + radius];
          g += data[i + 1] * gaussMatrix[j + radius];
          b += data[i + 2] * gaussMatrix[j + radius];
          gaussSum += gaussMatrix[j + radius];
        }
      }
      i = (y * width + x) * 4;

      data[i] = r / gaussSum;
      data[i + 1] = g / gaussSum;
      data[i + 2] = b / gaussSum;
    }
  }
  //y方向
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      r = g = b = a = 0;
      gaussSum = 0;
      for (j = -radius; j <= radius; j++) {
        k = y + j;
        if (k >= 0 && k < height) { //确保 k 没超出 y 的范围
          i = (k * width + x) * 4;
          r += data[i] * gaussMatrix[j + radius];
          g += data[i + 1] * gaussMatrix[j + radius];
          b += data[i + 2] * gaussMatrix[j + radius];
          gaussSum += gaussMatrix[j + radius];
        }
      }
      i = (y * width + x) * 4;
      data[i] = r / gaussSum;
      data[i + 1] = g / gaussSum;
      data[i + 2] = b / gaussSum;

    }
  }

  return data;
}
