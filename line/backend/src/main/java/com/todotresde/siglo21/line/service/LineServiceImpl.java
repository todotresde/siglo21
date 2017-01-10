package com.todotresde.siglo21.line.service;

import com.todotresde.siglo21.line.dao.LineDao;
import com.todotresde.siglo21.line.dao.WorkStationConfigurationDao;
import com.todotresde.siglo21.line.model.Line;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Service
public class LineServiceImpl implements LineService{
    @Autowired
    private LineDao lineDao;

    public List<Line> all() {
        ArrayList<Line> lines = new ArrayList<Line>();

        for (Line line : lineDao.findAll()) {
            lines.add(line);
        }

        return lines;
    }

    public Line byId(Long id) {
        return lineDao.findById(id);
    }

    public Line delete(Long id) {
        Line line = lineDao.findById(id);
        lineDao.delete(id);
        return line;
    }

    public Line save(Line line) {
        lineDao.save(line);
        return line;
    }
}
